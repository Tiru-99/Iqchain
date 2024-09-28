import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          QuizApp
        </Link>
        <div>
          <Link href="/quizzes" className="text-white mr-4">
            All Quizzes
          </Link>
          <SignedIn>
            <Link href="/create-quiz" className="text-white mr-4">
              Create Quiz
            </Link>
          </SignedIn>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white text-blue-500 px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}