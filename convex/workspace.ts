import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
    args:{
        messages: v.any(),
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