import { describe, it, expect, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Appointments Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list appointments", async () => {
    const appointments = await caller.appointments.list();
    expect(Array.isArray(appointments)).toBe(true);
  });

  it("should create an appointment", async () => {
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 1);
    appointmentDate.setHours(10, 0, 0, 0);

    const result = await caller.appointments.create({
      clientName: "João Silva",
      clientPhone: "(11) 99999-9999",
      clientEmail: "joao@example.com",
      serviceId: 1,
      appointmentDate,
    });

    expect(result).toBeDefined();
  });

  it("should validate required fields", async () => {
    try {
      await caller.appointments.create({
        clientName: "",
        clientPhone: "",
        serviceId: 1,
        appointmentDate: new Date(),
      } as any);
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("Services Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list services", async () => {
    const services = await caller.services.list();
    expect(Array.isArray(services)).toBe(true);
  });
});

describe("Contact Router", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeEach(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should send a contact message", async () => {
    const result = await caller.contact.send({
      name: "Maria",
      email: "maria@example.com",
      message: "Gostaria de saber mais sobre o Agendify",
    });

    expect(result).toBeDefined();
  });

  it("should validate email format", async () => {
    try {
      await caller.contact.send({
        name: "Test",
        email: "invalid-email",
        message: "Test message",
      } as any);
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should require all fields", async () => {
    try {
      await caller.contact.send({
        name: "Test",
        email: "test@example.com",
        message: "",
      } as any);
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
