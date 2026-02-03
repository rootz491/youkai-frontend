/**
 * This file is used by Next.js to instrument your application.
 * It's called once when the server starts up.
 * 
 * For New Relic monitoring, we need to initialize the agent
 * when the Node.js runtime is available.
 */

export async function register() {
  // Only initialize New Relic on the server side (Node.js runtime)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import and initialize New Relic agent
    const newrelic = await import('newrelic')
    console.log('New Relic agent initialized for Studio Youkai Frontend')
  }
}
