export class UserProfile {
  private name: string = '';
  private age: number = 0;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  constructor(
    name: string,
    age: number,
    email: string,
    phone: string,
    address: string
  ) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getAddress(): string {
    return this.address;
  }

  toJSON(): Record<string, string | number> {
    return {
      name: this.name,
      age: this.age,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }
}

export class UserProfileBuilder {
  private name: string = '';
  private age: number = 0;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  setName(name: string): UserProfileBuilder {
    this.name = name;
    return this;
  }

  setAge(age: number): UserProfileBuilder {
    this.age = age;
    return this;
  }

  setEmail(email: string): UserProfileBuilder {
    this.email = email;
    return this;
  }

  setPhone(phone: string): UserProfileBuilder {
    this.phone = phone;
    return this;
  }

  setAddress(address: string): UserProfileBuilder {
    this.address = address;
    return this;
  }

  build(): UserProfile {
    return new UserProfile(
      this.name,
      this.age,
      this.email,
      this.phone,
      this.address
    );
  }
}

