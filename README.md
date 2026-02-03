# Tickets Manager

Next steps:
- Add zod validation.
- Improve function organization. I’m not sure if this is the best way to group similar functions. Maybe there’s something equivalent to a static class.
```ts
export const authController = {
	functionOne: ()=>{},
	functionTwo: ()=>{}
}
```

- Make a wrapper for services try catches