
import { Users, Logs, Images, Mails } from '../dao/factory.js'

import UsersRepository from "./users.repository.js";
import LogsRepository from "./logs.repository.js";
import ImagesRepository from "./images.repository.js";
import MailsRepository from "./mails.repository.js";

export const UsersService = new UsersRepository(new Users());
export const LogsService = new LogsRepository(new Logs());
export const ImagesService = new ImagesRepository(new Images());
export const MailsService = new MailsRepository(new Mails());