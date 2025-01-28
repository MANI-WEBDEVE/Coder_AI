import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
    args:{
        messages: v.any(),
        filesData: v.optional(v.any()),
        user: v.any(),
    },
    handler: async (ctx , args) => {
        const workspaceId = await ctx.db.insert("workspace", {
            messages: args.messages,
            user: args.user
        })
        return workspaceId;
    }
})

export const GetWorkSpace = query({
    args:{
        workspaceId: v.id("workspace")
    },
    handler: async (ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        return workspace;
    }
})

export const updateWorkSpace = mutation({
    args:{
        workspaceId: v.id("workspace"),
        messages: v.any()
    },
    handler: async (ctx, args) => {
        const workspace = await ctx.db.patch(args.workspaceId, {
            messages: args.messages
        })
        return workspace;
    }
})
export const updateFiles = mutation({
    args:{
        workspaceId: v.id("workspace"),
        files: v.any()
    },
    handler: async (ctx, args) => {
        const workspace = await ctx.db.patch(args.workspaceId, {
            fileData: args.files
        })
        return workspace;
    }
})

export const GetAllWorkSpace = query({
    args:{
        userId: v.id("users")
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.query("workspace")
        .filter((q) => q.eq(q.field("user"), args.userId))
        .collect();
        return result
    }

})