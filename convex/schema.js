import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users Table
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(), //clerk user id for auth
        email: v.string(),
        imageUrl: v.optional(v.string()),

        // onboarding
        hasCompletedOnboarding: v.boolean(),
        location: v.optional(
            v.object({
                city: v.string(),
                state: v.optional(v.string()),
                country: v.string(),
            })
        ),
        interests: v.optional(v.array(v.string())), // min 3 categories
        freeEventsCreated: v.number(), // track free event limit (1 free)

        // timestamps
        createdAt: v.number(),
        updatedAt: v.number()
    }).index("by_token", ["tokenIdentifier"]),

    events: defineTable({
        title: v.string(),
        description: v.string(),
        slug: v.string(),

        // organizer
        organizerId: v.id("users"), // fk to users table
        organizerName: v.string(),

         // event details
        category: v.string(),
        tags: v.array(v.string()),

        // date & time
        startDate: v.number(),
        endDate: v.number(),
        timezone: v.string(),

        // location
        locationType: v.union(v.literal("physical"), v.literal("online")),
        venue: v.optional(v.string()),
        address: v.optional(v.string()),
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),

        // capacity & ticketing
        capacity: v.number(),
        ticketType: v.union(v.literal("free"), v.literal("paid")),
        ticketPrice: v.optional(v.number()),
        registrationCount: v.number(),

        //customizations
        coverImage: v.optional(v.string()),
        themeColor: v.optional(v.string()),

        // timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_organizer", ["organizerId"])
        .index("by_category", ["category"])
        .index("by_start_date", ["startDate"])
        .index("by_slug", ["slug"])
        .searchIndex("search_title", {searchField: "title"}),

    registrations: defineTable({
        eventId: v.id("events"),
        userId: v.id("users"),

        // attendee info
        attendeeName: v.string(),
        attendeeEmail: v.string(),

        // qr code for entry
        qrCode: v.string(), // unique ID for qr

        // check in
        checkedIn: v.boolean(),
        checkedInAt: v.optional(v.number()),

        // status
        status: v.union(v.literal("confirmed"), v.literal("cancelled")),

        registeredAt: v.number(),
    })
        .index("by_event", ["eventId"])
        .index("by_user", ["userId"])
        .index("by_event_user", ["eventId", "userId"])
        .index("by_qr_code", ["qrCode"]),
})