import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { AuthDto } from "src/auth/dto";

const base_url = "http://localhost:3333";

describe("app e2e test", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      })
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl("http://localhost:3333");
  });

  afterAll(async () => {
    app.close();
  });

  const dto: AuthDto = {
    email: "jasmine@gmail.com",
    password: "1234",
  };
  describe("Auth", () => {
    describe("Signup", () => {
      it("should signup", () => {
        return pactum
          .spec()
          .post("/auth/signup")
          .withBody(dto)
          .expectStatus(200);
      });
    });
    describe("Signin", () => {
      it("should signin", () => {
        return pactum
          .spec()
          .post("/auth/signin")
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
  describe("User", () => {
    describe("Get me", () => {});
    describe("Edit user", () => {});
  });
  describe("Bookmarks", () => {
    describe("Create bookmark", () => {});
    describe("Get bookmarks", () => {});
    describe("Get bookmark by id", () => {});
    describe("Edit bookmark", () => {});
    describe("Delete bookmark", () => {});
  });
});
