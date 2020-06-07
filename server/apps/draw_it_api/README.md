# DrawItApi

A GraphQL API for DrawIt, based on [Absinthe](http://absinthe-graphql.org).

`DrawItWeb.Router` mounts the API schema for HTTP clients.

## Rules

- DrawItApi is a _client_ of DrawIt. Only call DrawIt's public interface.
- Do not use `absinthe_ecto`. Instead, load associations using `DrawItApi.Schema.Assoc.assoc/2`.
