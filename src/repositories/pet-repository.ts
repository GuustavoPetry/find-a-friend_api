import { Pet, Prisma, Size, Specie } from "@prisma/client";

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

    fetchPetsForCity(city: string, size?: Size, specie?: Specie, age?: number): Promise<Pet[] | null>;

    findById(id: string): Promise<Pet | null>;
}