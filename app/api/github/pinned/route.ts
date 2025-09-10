import { NextResponse } from "next/server";

export async function GET() {
const query = `
{
  user(login: "jvitorcsm") {
    pinnedItems(first: 10) {
      totalCount
      nodes {
        __typename
        ... on Repository {
          id name isPrivate
          description url homepageUrl
          stargazerCount forkCount updatedAt
          primaryLanguage { name }
          repositoryTopics(first: 5) { nodes { topic { name } } }
        }
        ... on Gist { id description }
      }
    }
  }
}
`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("GitHub GraphQL error:", text);
      return NextResponse.json(
        { error: "GitHub GraphQL failed", detail: text },
        { status: res.status }
      );
    }

    const json = JSON.parse(text);

    const repos =
      json?.data?.user?.pinnedItems?.nodes?.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.url,
        homepage: r.homepageUrl,
        stargazers_count: r.stargazerCount,
        forks_count: r.forkCount,
        updated_at: r.updatedAt,
        language: r.primaryLanguage?.name ?? null,
        topics: r.repositoryTopics?.nodes?.map((n: any) => n?.topic?.name) ?? [],
      })) ?? [];

    return NextResponse.json({ repos });
  } catch (err: any) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", detail: err.message },
      { status: 500 }
    );
  }
}
