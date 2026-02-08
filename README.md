# Tickets Manager

## Overview

Tickets Manager is a study/portfolio project focused on building a ticket management system from scratch, exploring backend architecture, authentication strategies, and domain modeling through real-world constraints.

The application supports two main actors — users and analysts — each with different responsibilities in the ticket lifecycle. The project is designed to evolve over time, prioritizing learning through implementation, refactoring, and architectural iteration.

Rather than aiming for a “perfect” first version, this project embraces progressive improvement and conscious technical tradeoffs.

---

## Goals

* Practice backend architecture using Node.js and Express
* Understand authentication flows (Sessions → JWT)
* Explore domain modeling and access control strategies
* Build a documented REST API with OpenAPI
* Prepare the application for production deployment
* Refactor toward cleaner architecture over time

---

## Learning-driven approach

Some parts of this project intentionally include:

* Technical debt
* Debatable architectural decisions
* Code smells
* Progressive refactoring

These choices are deliberate and serve as learning opportunities, simulating real-world scenarios where systems evolve incrementally.

Core features are implemented manually to reinforce fundamentals before introducing abstractions and automation.

---

## Architecture notes

Authentication currently uses session-based login and Passport, with plans to migrate to JWT.

---

## Planned evolution

* Session authentication → JWT
* Express → NestJS
* Unified User model with RBAC

---

## Roadmap

### High priority

* Deployment
* OpenAPI documentation

### Medium priority

* Zod validation
* Improve controller/service organization
* Centralized error handling wrapper
* Replace Passport login flow with JWT authentication

---

## Technical notes

Current controller structure:

```ts
export const authController = {
  functionOne: () => {},
  functionTwo: () => {}
}
```

This will be refactored as the project evolves toward clearer separation of concerns.

Temporary login implementation:

```ts
login: async (req: Request<{}, {}, loginDTO>, res: Response) => {
  const passportLogin = passport.authenticate('local', (error: any, user: Express.User)=>{
    if (error) return res.send(error.message)
    if(!user) return res.status(400).send('User must be informed')

    req.login(user, ()=>res.status(200).send('User loged in successfully'))
  })

  passportLogin(req, res)
}
```

---

## Philosophy

This project prioritizes understanding over speed and evolution over early perfection.

Architecture decisions are revisited continuously as new requirements and insights emerge.