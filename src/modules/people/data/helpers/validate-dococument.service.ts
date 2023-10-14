export class ValidateDocument {
  execute(document: string): boolean {
    document = document.replace(/[^\d]+/g, '');
    if (document.length === 11) {
      // CPF validation
      if (/^(\d)\1{10}$/.test(document)) return false;
      let add = 0;
      for (let i = 0; i < 9; i++)
        add += parseInt(document.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(document.charAt(9))) return false;
      add = 0;
      for (let i = 0; i < 10; i++)
        add += parseInt(document.charAt(i)) * (11 - i);
      rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(document.charAt(10))) return false;
      return true;
    } else if (document.length === 14) {
      // CNPJ validation
      if (/^(\d)\1{13}$/.test(document)) return false;
      let size = document.length - 2;
      let numbers = document.substring(0, size);
      const digits = document.substring(size);
      let sum = 0;
      let pos = size - 7;
      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (resultado !== parseInt(digits.charAt(0))) return false;
      size += 1;
      numbers = document.substring(0, size);
      sum = 0;
      pos = size - 7;
      for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (resultado !== parseInt(digits.charAt(1))) return false;
      return true;
    }
    return false;
  }
}
