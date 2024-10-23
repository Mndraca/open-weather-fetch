export async function getData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("Something went wrong with the responce");
    }
    const res = response.json();
    return res;
  } catch (err) {
    console.error("You got thie erroe", err);
  }
}
