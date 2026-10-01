export const validation = {
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain an uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain a lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain a number');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  isValidName(name: string): boolean {
    return name.trim().length >= 2;
  },

  isValidTitle(title: string): boolean {
    return title.trim().length >= 5 && title.trim().length <= 100;
  },

  isValidDescription(description: string): boolean {
    return description.trim().length >= 10 && description.trim().length <= 2000;
  },

  isValidAddress(address: string): boolean {
    return address.trim().length >= 5;
  },
};
