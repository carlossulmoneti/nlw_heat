import { Router } from "express"
import { AuthenticateUserController} from "./controller/AuthenticateUserController"
import { CreateMessageController } from "./controller/CreateMessageController"
import { GetLast3MessagesController } from "./controller/Get3MessagesController"
import { ProfileUserController } from "./controller/ProfileUserController"
import { ensureAuthenticate } from "./middleware/EnsureAuthenticate"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post("/messages", ensureAuthenticate, new CreateMessageController().handle)

router.get('/messages/last3', new GetLast3MessagesController().handle)

router.get('/profile', ensureAuthenticate, new ProfileUserController().handle)

export {router}
