import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from './models/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { PASSWORD_HASH_SALT } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  async verify(verificationLink): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ verificationLink });
    if (!user) throw new Error("User with this verificationLink doesn't exists");
    const updateResult = await this.usersRepository.update({ id: user.id }, { verified: true });
    return !!updateResult.affected;
  }

  async signup({ username, email, password }: SignUpDto): Promise<User> {
    if (await this.isUsernameTaken(username)) throw new ConflictException('User with this username already exists');
    if (await this.isEmailTaken(email)) throw new ConflictException('User with this email already exists');
    const passwordHash = bcrypt.hashSync(password, PASSWORD_HASH_SALT);
    const verificationLink = v4();
    const user = await this.usersRepository.save({ username, email, passwordHash, verificationLink });
    await this.sendVerificationMail(user.email, user.verificationLink);
    return user;
  }

  private async isUsernameTaken(username: string): Promise<boolean> {
    return !!(await this.usersRepository.findOneBy({ username }));
  }

  private async isEmailTaken(email: string): Promise<boolean> {
    return !!(await this.usersRepository.findOneBy({ email }));
  }

  private async sendVerificationMail(to: string, verificationLink: string) {
    return await this.mailerService.sendMail({
      to,
      from: process.env.MAIL_USER,
      subject: 'Activate your account',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <p>Hello!</p>
          <p>You are receiving this email because you have registered on our website. Please confirm your email address by clicking the button below:</p>
          <p>
            <a href="${process.env.SERVER_URL}/auth/verify/${verificationLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm</a>
          </p>
          <p>If you did not sign up for our website, please ignore this email.</p>
        </div>
      `,
    });
  }
}
