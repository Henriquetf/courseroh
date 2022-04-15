import { getAccessToken, getSession } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next"
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/api/auth/login">Logout</Link>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    }
  }

  const accessToken = await getAccessToken(context.req, context.res);

  console.log(accessToken);

  return {
    redirect: {
      destination: '/app',
      permanent: false,
    }
  }
}
