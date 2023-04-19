import Dexie from 'dexie';

interface Mnemonic {
  id?: number;
  name: string;
  mnemonic: string;
  choose: boolean;
  iv:string;
}

export class MnemonicDB extends Dexie {
  mnemonics: Dexie.Table<Mnemonic, number>;

  constructor() {
    super('MnemonicDB');
    this.version(1).stores({
      mnemonics: '++id, name, mnemonic',
    });
    this.mnemonics = this.table('mnemonics');
  }

  async add(mnemonic: string, name:string,iv:string) {
    return await this.mnemonics.add({ mnemonic: mnemonic, name: name, choose:false,iv:iv})
  }

  async choose(id:number) {
    return await this.mnemonics.update(id, { choose: true })
  }

  async unchoose(id:number) {
    return await this.mnemonics.update(id, { choose: false })
  }
 
  async selectByName(name:string) {
    return await this.mnemonics.where('name').equals(name).toArray()
  }

  async selectAll() {
    return await this.mnemonics.toArray()
  }

  async update(id: number, mnemonic: string) {
    return await this.mnemonics.update(id, { mnemonic: mnemonic })
  }

  async del(id: number) {
    return await this.mnemonics.delete(id)
  }
}
