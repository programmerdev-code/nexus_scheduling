import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, services, appointments, contactMessages, InsertService, InsertAppointment, InsertContactMessage, owner, blockedTimes, InsertOwner, InsertBlockedTime } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Agendify Queries
export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(services).values(service);
}

export async function getServices() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(services);
}

export async function createAppointment(appointment: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(appointments).values(appointment);
}

export async function getAppointments(filters?: { status?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  if (filters?.status) {
    return db.select().from(appointments).where(eq(appointments.status, filters.status as any));
  }
  
  return db.select().from(appointments);
}

export async function updateAppointmentStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(appointments).set({ status: status as any }).where(eq(appointments.id, id));
}

export async function deleteAppointment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(appointments).where(eq(appointments.id, id));
}

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contactMessages).values(message);
}

export async function getContactMessages() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(contactMessages);
}

// Owner queries
export async function getOwnerByUsername(username: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(owner).where(eq(owner.username, username)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createOwner(ownerData: InsertOwner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(owner).values(ownerData);
}

// Blocked times queries
export async function blockTime(blockedTime: InsertBlockedTime) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(blockedTimes).values(blockedTime);
}

export async function getBlockedTimes() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(blockedTimes);
}

export async function deleteBlockedTime(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(blockedTimes).where(eq(blockedTimes.id, id));
}
