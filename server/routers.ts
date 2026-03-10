import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createAppointment, getAppointments, createService, getServices, createContactMessage, getContactMessages, deleteAppointment, updateAppointmentStatus } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Agendify Routers
  appointments: router({
    list: publicProcedure.query(async () => {
      return getAppointments();
    }),
    create: publicProcedure
      .input(z.object({
        clientName: z.string(),
        clientPhone: z.string(),
        clientEmail: z.string().email().optional(),
        serviceId: z.number(),
        appointmentDate: z.date(),
      }))
      .mutation(async ({ input }) => {
        return createAppointment({
          clientName: input.clientName,
          clientPhone: input.clientPhone,
          clientEmail: input.clientEmail,
          serviceId: input.serviceId,
          appointmentDate: input.appointmentDate,
          status: "pending",
        });
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        return updateAppointmentStatus(input.id, input.status);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteAppointment(input.id);
      }),
  }),

  services: router({
    list: publicProcedure.query(async () => {
      return getServices();
    }),
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        description: z.string().optional(),
        duration: z.number(),
        price: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return createService({
          name: input.name,
          description: input.description,
          duration: input.duration,
          price: input.price,
        });
      }),
  }),

  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        return createContactMessage({
          name: input.name,
          email: input.email,
          message: input.message,
          status: "new",
        });
      }),
    list: protectedProcedure.query(async () => {
      return getContactMessages();
    }),
  }),
});

export type AppRouter = typeof appRouter;
