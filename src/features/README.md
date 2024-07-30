# Features

This directory contains feature-specific modules for the React application, written in TypeScript (TSX). Each feature module can have its own components, utils, services, and other related files. This structure promotes modularity and encapsulation, making it easier to manage and scale the application.

## Common Subdirectories

Some examples of subdirectories that might be included in a feature module are:

- **components**: Reusable components specific to the feature.
- **utils**: Utility functions specific to the feature.
- **services**: Service functions specific to the feature.

## Example Feature

Here is an example of a simple feature module for a "Profile" feature:

### Directory Structure

```txt
features/
└── profile/
  ├── components/
  │ └── profile-card.tsx
  ├── utils/
  │ └── format-date.ts
  ├── services/
  │ └── profile-service.ts
```

### Example Files

#### profile-card.tsx

```tsx
// features/profile/components/profile-card.tsx

import React from 'react';

interface ProfileCardProps {
    name: string;
    email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email }) => {
    return (
        <div className="profile-card">
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    );
};

export default ProfileCard;
```

#### format-date.ts

```tsx
// features/profile/utils/format-date.ts

/**
 * Formats a date string into a more readable format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
}
```

#### profile.ts

```tsx
// features/profile/services/profile.ts

import axios from 'axios';

/**
 * Fetches profile data from an external API.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the profile data.
 */
export async function fetchProfileData(userId: string): Promise<any> {
    const response = await axios.get(`https://api.example.com/users/${userId}`);
    return response.data;
}
```
