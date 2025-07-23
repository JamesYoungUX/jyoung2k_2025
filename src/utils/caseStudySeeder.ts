import { FirestoreService } from './firestore';
import { bravadoHealthCaseStudy } from '../data/caseStudies';
import type { CaseStudy } from '../types/firestore';

export class CaseStudySeeder {
  private static readonly COLLECTION_NAME = 'caseStudies';

  /**
   * Seed the Bravado Health case study into Firestore
   */
  static async seedBravadoHealth(): Promise<string> {
    try {
      console.log('Seeding Bravado Health case study...');
      
      const caseStudyId = await FirestoreService.create(
        this.COLLECTION_NAME,
        {
          ...bravadoHealthCaseStudy,
          id: 'bravado-health', // Use a consistent ID
        }
      );

      console.log(`Successfully seeded Bravado Health case study with ID: ${caseStudyId}`);
      return caseStudyId;
    } catch (error) {
      console.error('Error seeding Bravado Health case study:', error);
      throw error;
    }
  }

  /**
   * Seed all case studies
   */
  static async seedAll(): Promise<string[]> {
    try {
      console.log('Seeding all case studies...');
      
      const caseStudyIds: string[] = [];
      
      // Seed Bravado Health
      const bravadoId = await this.seedBravadoHealth();
      caseStudyIds.push(bravadoId);

      console.log(`Successfully seeded ${caseStudyIds.length} case studies`);
      return caseStudyIds;
    } catch (error) {
      console.error('Error seeding case studies:', error);
      throw error;
    }
  }

  /**
   * Check if case study already exists
   */
  static async caseStudyExists(id: string): Promise<boolean> {
    try {
      const existingCaseStudy = await FirestoreService.read<CaseStudy>(
        this.COLLECTION_NAME,
        id
      );
      return existingCaseStudy !== null;
    } catch (error) {
      console.error('Error checking if case study exists:', error);
      return false;
    }
  }

  /**
   * Update existing case study or create new one
   */
  static async upsertCaseStudy(id: string, caseStudyData: Partial<CaseStudy>): Promise<string> {
    try {
      const exists = await this.caseStudyExists(id);
      
      if (exists) {
        await FirestoreService.update(this.COLLECTION_NAME, id, caseStudyData);
        console.log(`Updated case study: ${id}`);
        return id;
      } else {
        const newId = await FirestoreService.create(this.COLLECTION_NAME, {
          ...caseStudyData,
          id,
        });
        console.log(`Created new case study: ${newId}`);
        return newId;
      }
    } catch (error) {
      console.error('Error upserting case study:', error);
      throw error;
    }
  }
} 