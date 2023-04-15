interface IMailConfig {
  driver: 'ethereal' | 'server';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'no-reply@inspireweb.com.br',
      name: 'Gustavo Valgoi',
    },
  },
} as IMailConfig;
