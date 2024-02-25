import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as bodyParser from "body-parser"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const { PORT } = process.env
    app.setGlobalPrefix("api")
    app.enableCors()
    app.use(bodyParser.json())
    app.useGlobalPipes(new ValidationPipe())
    try {
        await app.listen(PORT, () =>
            console.log(`Server listening on PORT ${PORT}`),
        )
    } catch (error) {
        console.log(error)
    }
}
bootstrap()
