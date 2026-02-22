async function runAudit() {
    const response = await fetch('https://turtlelabs.co.in/');
    const html = await response.text();

    const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

    const imgs = [...html.matchAll(/<img[^>]*>/gi)].map(m => {
        const altMatch = m[0].match(/alt=["']([^"']*)["']/i);
        return { tag: m[0], alt: altMatch ? altMatch[1] : null };
    });

    console.log('--- LIVE SITE METADATA ---');
    console.log('Meta Description:', metaDesc ? metaDesc[1] : 'None');

    console.log('\n--- LIVE SITE HEADERS ---');
    console.log('H1s:', h1s);
    console.log('H2s:', h2s);
    console.log('H3s:', h3s);

    console.log('\n--- LIVE SITE TARGET IMAGES (MISSING ALT) ---');
    imgs.filter(img => !img.alt || img.alt.trim() === '').forEach(img => console.log(img.tag));

    console.log('\n--- LIVE SITE IMAGES (WITH ALT) ---');
    imgs.filter(img => img.alt && img.alt.trim() !== '').forEach(img => console.log(img.tag));
}
runAudit().catch(console.error);
