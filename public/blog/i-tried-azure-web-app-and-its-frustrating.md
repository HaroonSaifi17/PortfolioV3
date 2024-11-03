## Hosting My Portfolio on Azure: The Ups and Downs

### Why I Made the Shift to Azure

I recently decided to move my portfolio site from Vercel's free hosting to Azure, and I had a few good reasons for doing so:

1. **Azure's Student Credits**: As a student, I received $100 in free Azure credits, which gave me more flexibility to experiment.
2. **Avoiding Cold Starts**: Vercel’s serverless functions occasionally have cold starts, which I wanted to eliminate.
3. **Learning Infrastructure**: I wanted to deepen my understanding of deployment and infrastructure.

### Setting Up with Azure

The best and easiest way to host a web app on Azure is to use an **App Service**. For deployment, I used **Docker**, creating an App Service that was continuously integrated with Azure Container Registry (ACR). I also set up a GitHub workflow for an automatic deployment pipeline.

### The Unexpected Issue

Everything was running smoothly until one day, after pushing changes to my GitHub repo, my deployment failed. Unfortunately, I wasn’t aware of this for a whole day because I didn’t check the live URL; my Docker image had built and run fine locally, and previous deployments had gone off without a hitch.

That same day, I had applied to multiple internship openings and included my site URL. Little did I know that my site was down! When I finally checked and saw the issue, I was frustrated, realizing that many recruiters may have seen a broken website.

![Error Message](/images/azure-error.webp)

### Troubleshooting

When I saw the Azure deployment error, I tried several things to troubleshoot:

- Rebuilt and re-pushed the image to ACR
- Tested the image on a virtual machine
- Reached out to my college society for help

Unfortunately, nothing seemed to work. I was lost—the error seemed vague, and my code itself had no issues. In the end, I temporarily reverted the DNS back to Vercel just to have a live site.

### The Real Cause

After digging through my Git history, I noticed that I had removed a wildcard route in my app, which redirected requests to an error page. Out of frustration, I re-added the wildcard route and, surprisingly, the deployment worked!

It turned out that Azure’s deployment check involves pinging a specific route to verify that the app is running. When that route failed to respond (likely because it wasn’t the home route), the deployment was marked as failed. This was confusing—why not consider the app running as long as the container is live?

```ts
// app.routes.ts
import { Routes } from "@angular/router";
import { blogInfo } from "./utils/blog-info.data";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./features/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "blog",
    children: blogInfo.map((blog) => ({
      loadComponent: () => import("./features/blog/blog.component").then((m) => m.BlogComponent),
      ...blog,
    })),
  },
  {
    path: "blogs",
    loadComponent: () => import("./layout/blogs/blogs.component").then((m) => m.BlogsComponent),
  },
  {
    path: "error",
    loadComponent: () => import("./layout/not-found/not-found.component").then((m) => m.NotFoundComponent),
  },
  {
    path: "**", // Wildcard route
    redirectTo: "error",
  },
];
```

### Final Thoughts

This experience was frustrating. I spent an entire day debugging a deployment issue caused by Azure's verification process, which was not clearly documented. To make things worse, Azure's error messages were off-topic and vague, and support is limited for the student plan. I also didn’t receive any notification about the deployment failure.

This is my experience with Azure so far. I'm still learning, so if I've made mistakes or you have suggestions, feel free to reach out via email. I’d be happy to respond and update this blog with new insights.

---
