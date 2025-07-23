# Firestore Setup and Case Study Data

## Overview

This project has been updated with a new Firestore structure for case studies that matches the provided data format.

## Updated Case Study Structure

The simplified `CaseStudy` interface includes the essential fields:

```typescript
interface CaseStudy {
  company: string;           // Company name
  image?: string;            // Optional image URL
  hidden?: boolean;          // Whether to hide from display
  featured?: boolean;        // Whether to feature this case study
}
```

## Seeding Data

### Option 1: Browser Console (Development)

In development mode, the following functions are available in the browser console:

```javascript
// Seed all case studies
await seedCaseStudies();

// Seed only Bravado Health case study
await seedBravadoHealth();
```

### Option 2: Programmatic Usage

```typescript
import { CaseStudySeeder } from './src/utils/caseStudySeeder';

// Seed Bravado Health case study
const caseStudyId = await CaseStudySeeder.seedBravadoHealth();

// Seed all case studies
const caseStudyIds = await CaseStudySeeder.seedAll();

// Check if a case study exists
const exists = await CaseStudySeeder.caseStudyExists('bravado-health');

// Upsert a case study (create or update)
const id = await CaseStudySeeder.upsertCaseStudy('bravado-health', caseStudyData);
```

## Bravado Health Case Study Data

The Bravado Health case study includes:

- **Company**: Bravado Health
- **Image**: Unsplash healthcare image URL
- **Hidden**: false (visible in case studies list)
- **Featured**: true (appears first in the list)


## Using the Data

### Fetching Case Studies

```typescript
import { useFirestoreCollection } from './src/hooks/useFirestore';

// Fetch all case studies
const { data: caseStudies, loading, error } = useFirestoreCollection<CaseStudy>('caseStudies');

// Fetch only visible case studies (not hidden)
const { data: visibleCaseStudies } = useFirestoreCollection<CaseStudy>('caseStudies', {
  where: [{ field: 'hidden', operator: '==', value: false }]
});

// Fetch visible case studies ordered by featured first
const { data: orderedCaseStudies } = useFirestoreCollection<CaseStudy>('caseStudies', {
  where: [{ field: 'hidden', operator: '==', value: false }],
  orderBy: { field: 'featured', direction: 'desc' }
});



### Fetching a Single Case Study

```typescript
import { useFirestoreDocument } from './src/hooks/useFirestore';

const { data: caseStudy, loading, error } = useFirestoreDocument<CaseStudy>('caseStudies', 'bravado-health');
```

## Firestore Rules

Make sure your Firestore security rules allow read access to the case studies collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /caseStudies/{document} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null;  // Authenticated write access
    }
  }
}
```

## Environment Variables

Ensure your Firebase configuration is set up in your environment variables:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Next Steps

1. Set up your Firebase project and add the environment variables
2. Run the development server: `npm run dev`
3. Open the browser console and run: `await seedBravadoHealth()`
4. Check your Firestore database to see the seeded data
5. The case studies should now appear in your application 