import { Application, Router } from "oak/mod.ts";
import { oakCors } from "cors/mod.ts";

const app = new Application();
const router = new Router();

// Enable CORS for all routes
app.use(oakCors({ origin: "*" }));

// In-memory list of stories
interface Story {
    id: number;
    title: string;
    description: string;
}
let stories: Story[] = [];

// Routes
router
    .get("/api/stories", (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = stories;
    })
    .post("/api/stories", async (ctx) => {
        const body = await ctx.request.body({ type: "json" }).value;
        const newStory: Story = {
            id: stories.length + 1,
            title: body.title,
            description: body.description,
        };
        stories.push(newStory);
        ctx.response.status = 201;
        ctx.response.body = newStory;
    });

// Attach routes & start server
app.use(router.routes());
app.use(router.allowedMethods());

console.log("📡 Backend listening on http://localhost:8000");
await app.listen({ port: 8000 });
