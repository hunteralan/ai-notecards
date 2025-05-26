import { Provider } from "~/constants/providers";
import { authenticator } from "~/services/auth.server";
import { Form } from "react-router";
import type { Route } from "./+types/signIn";

export async function action({ request }: Route.ActionArgs) {
  await authenticator.authenticate(Provider.GOOGLE, request);
}

export default function SignIn() {
  return (
    <div className="bg-zinc-950 h-screen ">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <img src="/logo.png" className="lg:hidden block" />
            <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
              <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
                Create study material with ease
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                Powered by AI, our app helps you generate flashcards and
                catagorize via classrooms,
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <p>Sign in with </p>
                <Form method="POST">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                        fill="#EA4335"
                      />
                      <path
                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                        fill="#34A853"
                      />
                    </svg>
                    <span className="text-sm/6 font-semibold">Google</span>
                  </button>
                </Form>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src="/logo.png"
                  className="hover:scale-[105%] hover:rotate-1 duration-400 hidden lg:block"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 lg:px-8 fixed bottom-0 w-screen">
        <div className="border-t border-white/10 py-12 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
            &copy; 2024 Hunter West Software Co. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
