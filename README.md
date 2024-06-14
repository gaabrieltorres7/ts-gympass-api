<h1 align="center" style="font-weight: bold;">Gympass API 💻</h1>

<p align="center">
 • <a href="#technologies">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#colab">Collaborators</a>
</p>

<p align="center">
    <b>A RESTful API built using fastify that emulates the functionality of a Gympass app. Throughout the project, I have learned several best practices in software development, including: SOLID principles(dependency inversion), factory and repository patterns, mocking, unit/e2e tests(vitest) and CI.</b>
</p>

<h2 id="technologies">💻 Technologies</h2>

- NodeJS
- TypeScript
- Fastify
- PostgreSQL
- Docker

<h2 id="started">🚀 Getting started</h2>

<h3>Prerequisites</h3>

- NodeJS
- Git

<h3>Cloning</h3>

```bash
git clone https://github.com/gaabrieltorres7/ts-gympass-api
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env`

```yaml
NODE_ENV=dev
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBNAME?schema=public"
POSTGRES_DB=example
POSTGRES_USER=example
POSTGRES_PASSWORD=example
JWT_SECRET=example
```

<h3>Starting</h3>

```bash
cd ts-gympass-api
npm i
npm run dev
npm run test
npm run test:watch
npm run test:e2e
npm run test:e2e:watch
npm run test:coverage
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/98062444?v=4" width="100px;" alt="Gabriel Torres Profile Picture"/><br>
        <sub>
          <b>Gabriel Torres</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h3>If you want to contribute, here are some documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)

<h2>Functionalities</h2>

#### Functional Requirements
 - [x] It must be possible to register.
 - [x] It must be possible to authenticate.
 - [x] It must be possible to obtain the profile of a logged-in user.
 - [x] It must be possible to obtain the number of check-ins performed by the logged-in user.
 - [x] It must be possible for the user to obtain their check-in history.
 - [x] It must be possible for the user to search for nearby gyms (up to 10km).
 - [x] It must be possible for the user to search for gyms by name.
 - [x] It must be possible for the user to check-in at a gym.
 - [x] It must be possible to validate a user's check-in.
 - [x] It must be possible to register a gym.
#### Business Rules
 - [x] The user cannot register with a duplicate email.
 - [x] The user cannot make 2 check-ins on the same day.
 - [x] The user cannot check-in if not near (100m) the gym.
 - [x] The check-in can only be validated up to 20 minutes after it is created.
 - [x] The check-in can only be validated by administrators.
 - [x] The gym can only be registered by administrators.
#### Non-functional Requirements
 - [x] The user's password must be encrypted.
 - [x] The application data must be persisted in a PostgreSQL database.
 - [x] All data lists must be paginated with 20 items per page.
 - [x] The user must be identified by a JWT (JSON Web Token).
