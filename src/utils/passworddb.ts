import Dexie from 'dexie';

interface Password {
  id?: number;
  password: string;
}

export class PasswordDB extends Dexie {
  password: Dexie.Table<Password, number>;

  constructor() {
    super('passwordDB');
    this.version(1).stores({
      password: '++id, password',
    });
    this.password = this.table('password');
  }

  async add(password: string) {
    return await this.password.add({ password:password });
  }

  async selectAll() {
    return await this.password.toArray()
  }

  async update(id: number, password: string) {
    return await this.password.update(id, { password: password })
  }

  async del(id: number) {
    return await this.password.delete(id)
  }

  async clear(){
    await this.password.clear()
  }
}
