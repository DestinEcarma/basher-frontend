# Pages

This directory contains the main pages of the React application, written in TypeScript (TSX). Pages are high-level components that represent different routes or views in the application. Each page typically corresponds to a route defined in the routing configuration.

## Common Pages

Some examples of pages that might be included in this directory are:

- **HomePage**: The main landing page of the application.
- **AboutPage**: A page that provides information about the application or company.
- **ContactPage**: A page with a contact form or contact information.
- **ProfilePage**: A user profile page.
- **DashboardPage**: A page that displays user-specific data and actions.

## Example Page

Here is an example of a simple home page component written in TSX:

```tsx
// pages/HomePage.tsx

import React from 'react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
    const handleClick = () => {
        alert('Welcome to the Home Page!');
    };

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to our application!</p>
            <Button label="Click Me" onClick={handleClick} />
        </div>
    );
};

export default HomePage;
```
