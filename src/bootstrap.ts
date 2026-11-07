// Paint the meaningful HTML shell before requesting the SPA runtime. Keeping
// this in an external module also complies with the production script CSP.
requestAnimationFrame(() => void import('./main'));
