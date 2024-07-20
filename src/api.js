import axios from "axios";

const API_URL = "http://test-backend.itdelta.agency/api";

export const getImages = async () => {
  try {
    const response = await axios.get(`${API_URL}/images`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении списка фотографий:", error);
    throw error;
  }
};

export const getFirstImage = async () => {
  const images = await getImages();
  if (images.length > 0) {
    return images[0];
  } else {
    throw new Error("Нет доступных изображений");
  }
};

export async function getAllImages() {
  const numberOfImages = 16;
  const requests = [];

  for (let i = 1; i <= numberOfImages; i++) {
    requests.push(
      fetch(`http://test-backend.itdelta.agency/api/image/${i}`).then(
        (response) => response.json()
      )
    );
  }

  try {
    const images = await Promise.all(requests);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export async function postComment(imageId, comment) {
  try {
    const response = await fetch(`${API_URL}/${imageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      throw new Error(
        `Ошибка при отправке комментария: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке комментария:", error);
    throw error;
  }
}

export async function postCommentsForAllImages(comment) {
  const numberOfImages = 16;
  const requests = [];

  for (let i = 1; i <= numberOfImages; i++) {
    requests.push(postComment(i, comment));
  }

  try {
    await Promise.all(requests);
    console.log("Комментарии успешно отправлены на все изображения");
  } catch (error) {
    console.error(
      "Ошибка при отправке комментариев на все изображения:",
      error
    );
    throw error;
  }
}
