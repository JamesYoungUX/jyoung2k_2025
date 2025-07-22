# Firestore React App

A modern, responsive web application built with React, Vite, Tailwind CSS 4, and Firebase Firestore. Perfect for displaying and managing Firestore data with a beautiful, mobile-first interface.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **Tailwind CSS 4** (beta) for modern, responsive styling
- **Firebase Firestore** integration with real-time data
- **Fully responsive** design that works on all devices
- **Custom hooks** for easy Firestore operations
- **Reusable components** for consistent UI
- **Error handling** and loading states
- **Apache server** deployment ready

## 📦 What's Included

- **Firestore Integration**: Custom hooks for reading collections and documents
- **Responsive Components**: Cards, data displays, loading states, and error handling
- **TypeScript Support**: Full type safety for Firestore operations
- **Modern UI**: Clean, accessible interface built with Tailwind CSS 4
- **Real-time Updates**: Optional real-time listeners for live data
- **Array Support**: Special handling for arrays within Firestore documents

## 🛠 Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Firebase:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key-here
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

3. **Update Firestore rules** (make sure your collections are readable):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to your collections
       match /{collection}/{document=**} {
         allow read: if true; // Adjust based on your security needs
       }
     }
   }
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Basic Firestore Operations

The app includes custom hooks for easy Firestore integration:

```tsx
import { useFirestoreCollection, useFirestoreDocument } from './hooks/useFirestore';

// Fetch a collection
const { data, loading, error, refresh } = useFirestoreCollection('your-collection', {
  limit: 10,
  orderBy: { field: 'createdAt', direction: 'desc' }
});

// Fetch a single document
const { data: doc, loading, error } = useFirestoreDocument('collection', 'documentId');
```

### Customizing Collections

Update the collection tabs in `src/App.tsx`:

```tsx
const collections = [
  { id: "your-collection", name: "Your Data", icon: "📄" },
  { id: "another-collection", name: "More Data", icon: "📝" },
  // Add your Firestore collections here
];
```

### Data Structure

The app expects Firestore documents with this general structure:

```javascript
{
  id: "document-id",
  title: "Document Title",
  description: "Document description",
  content: "Main content",
  createdAt: timestamp,
  updatedAt: timestamp,
  author: "Author name",
  category: "Category",
  tags: ["tag1", "tag2"],
  featured: true,
  // Arrays are supported and will be displayed specially
  items: [/* array items */],
  metadata: {/* nested objects */}
}
```

## 🏗 Project Structure

```
src/
├── components/
│   └── ui/
│       ├── Card.tsx          # Reusable card components
│       ├── DataDisplay.tsx   # Data display with loading/error states
│       ├── Error.tsx         # Error handling components
│       └── Loading.tsx       # Loading spinners and skeletons
├── config/
│   └── firebase.ts          # Firebase configuration
├── hooks/
│   └── useFirestore.ts       # Custom Firestore hooks
├── types/
│   └── firestore.ts          # TypeScript types for Firestore
├── utils/
│   └── firestore.ts          # Firestore utility functions
├── App.tsx                   # Main application component
├── index.css                 # Tailwind CSS imports and custom styles
└── main.tsx                  # Application entry point
```

## 🎨 Styling

Built with Tailwind CSS 4 (beta) featuring:

- **Responsive design** with mobile-first approach
- **Custom color palette** with primary colors
- **Smooth animations** and transitions
- **Accessible components** with proper ARIA labels
- **Custom utility classes** for common patterns

### Key CSS Classes

- `.btn-primary`, `.btn-secondary` - Button styles
- `.card` - Card container
- `.loading-spinner` - Loading animation
- `.input-field` - Form input styling

## 🚀 Deployment

### For Apache Server

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your Apache server

3. **Configure Apache** for SPA routing (optional):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Environment Variables for Production

Create a production `.env` file with your production Firebase config:

```env
VITE_FIREBASE_API_KEY=prod-api-key
VITE_FIREBASE_PROJECT_ID=prod-project-id
# ... other production values
```

## 📱 Responsive Design

The app is fully responsive and tested on:

- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large screens**: 1280px and up

Key responsive features:
- Adaptive grid layouts
- Mobile-friendly navigation
- Touch-optimized interactions
- Readable typography at all sizes

## 🔧 Customization

### Adding New Components

1. Create component in `src/components/ui/`
2. Follow the existing pattern with TypeScript interfaces
3. Include proper responsive classes
4. Add loading and error states as needed

### Extending Firestore Operations

Add new operations to `src/utils/firestore.ts`:

```tsx
// Example: Add search functionality
export const searchDocuments = async (collection: string, field: string, value: string) => {
  // Implementation here
};
```

## 📚 Documentation

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

## 🐛 Troubleshooting

### Common Issues

1. **Firestore connection fails**: Check your `.env` configuration
2. **CSS not loading**: Ensure Tailwind is properly configured in `vite.config.ts`
3. **Build fails**: Check for TypeScript errors and missing dependencies
4. **Data not displaying**: Verify Firestore rules allow read access

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React, Vite, Tailwind CSS 4, and Firebase