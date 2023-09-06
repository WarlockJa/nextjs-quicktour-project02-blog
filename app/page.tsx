import Posts from "./components/Posts";

// revalidation interval config
// export const revalidate = 10; // seconds. normally would be a very high number 86400(day)

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="my-12 text-3xl text-center dark:text-white">
        Hello and Welcome ✋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Dave</span>
        </span>
      </p>
      <Posts />
    </main>
  );
}
