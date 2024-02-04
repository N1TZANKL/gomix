import type {
  LoaderFunction,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

export let loader: LoaderFunction = async () => {
  const test = await fetch("http://localhost:8080/test");
  const message = await test.text();

  return {
    message,
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const response = await fetch("http://localhost:8080/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const data = await response.text();
  return { data };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Gomix" },
    // { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { message } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div style={{ fontFamily: "system-ui" }}>
      <h1>Golang + Remix app</h1>
      <h2> message: {message}</h2>
      <Form method="post">
        <button type="submit">Click me to trigger action</button>
      </Form>
      {actionData?.data && <h2>Server responded: {actionData.data}</h2>}
    </div>
  );
}
