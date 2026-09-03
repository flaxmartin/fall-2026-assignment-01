export class InvalidDNAError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidDNAError";
  }
}

export function transcribeDNA(dna: string): string {
  return dna
    .split("")
    .map((nucleotide) => {
      switch (nucleotide) {
        case "A":
          return "U";
        case "T":
          return "A";
        case "C":
          return "G";
        case "G":
          return "C";
        default:
          throw new InvalidDNAError(
            `Invalid DNA nucleotide: ${nucleotide}`,
          );
      }
    })
    .join("");
}
