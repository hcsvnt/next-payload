import Link from 'next/link';

export default function Page() {
    return (
        <main>
            <h1>Hello Huncwot,</h1>
            <p>
                <strong>choose your life path:</strong>
            </p>
            <ul>
                <li>
                    <Link href='/docs'>I want to read documentation</Link>
                </li>
                <li>
                    <Link href='/test'>I want to see the Test Page</Link>
                </li>
                <li>
                    <Link href='/admin'>I want to Admin this thing</Link>
                </li>
            </ul>
        </main>
    );
}
