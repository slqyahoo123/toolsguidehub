---
title: "How to Fix 'CORS Error' in Web Development (The Complete Guide)"
description: "The 'Access-Control-Allow-Origin' error is one of the most common issues in modern web development. Understand what CORS is, why it exists, and how to fix it for good."
date: "2026-02-23"
updated: "2026-02-23"
author: "Senior Software Engineer"
category: "troubleshooting-guides"
image: "/images/blog/cors-error-fix.jpg"
featured: false
---

## ❌ The Dreaded Red Console Error

If you've ever tried to fetch data from an external API in your JavaScript application, you've almost certainly seen this:

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is 
present on the requested resource.
```

This is not a bug in your code. It's a **security feature** of the browser. Let's break it down.

---

## 🔍 What is CORS?

CORS stands for **Cross-Origin Resource Sharing**. It's a security mechanism built into every modern browser that prevents a website from making HTTP requests to a different "origin" (domain, protocol, or port) than the one that served it.

### Why Does It Exist?

Without CORS, any malicious website could make requests to your bank's API using your logged-in session cookies. CORS prevents this by requiring the **target server** to explicitly grant permission.

---

## 🛠️ 4 Ways to Fix CORS Errors

### Fix 1: Configure the Server (The "Correct" Solution)

If you control the API server, add the appropriate CORS headers to your response:
- `Access-Control-Allow-Origin: *` (allows any origin — use for public APIs only)
- `Access-Control-Allow-Origin: https://your-app.com` (allows only your specific frontend)

In Node.js/Express, this is a one-liner with the `cors` middleware package.

### Fix 2: Use a Proxy in Development

If you're using Next.js, Vite, or Create React App, you can configure a **development proxy** that routes your API calls through your local server, avoiding CORS entirely.

For Next.js, use the `rewrites` option in `next.config.js`:
```js
async rewrites() {
  return [
    {
      source: '/api/external/:path*',
      destination: 'https://api.example.com/:path*',
    },
  ]
}
```

### Fix 3: Server-Side API Routes

Instead of calling the external API from the browser, call it from a **Server Component** or **API Route** in your backend. Server-to-server requests are not subject to CORS.

### Fix 4: Use a CORS Proxy (Quick Hack — Not for Production)

For quick prototyping, you can route requests through a CORS proxy like `cors-anywhere`. **Warning:** This is insecure and should never be used in production.

---

## ⚠️ Common Mistakes

1. **Adding CORS headers on the frontend:** CORS headers must be set by the **server**, not the client. Adding `Access-Control-Allow-Origin` to your `fetch()` request will do nothing.
2. **Using `mode: 'no-cors'`:** This doesn't fix the issue. It simply hides the error and returns an opaque, empty response.
3. **Forgetting Preflight Requests:** For `POST` requests with custom headers, the browser first sends an `OPTIONS` request. Your server must respond to `OPTIONS` with the correct CORS headers.

---

## 🏁 Summary

| Scenario | Best Fix |
| :--- | :--- |
| You control the API server | Configure CORS headers |
| Local development only | Use a dev proxy |
| Production frontend | Use server-side API routes |
| Quick prototype | CORS proxy (temporary) |

---

*Encountering more development errors? Check out our [troubleshooting guides](/troubleshooting-guides) or explore our [web development best practices](/web-development).*
