const enhanceTestimonial = async (originalText, clientInfo) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert at enhancing customer testimonials while maintaining authenticity. Your task is to expand brief testimonials into compelling stories that highlight transformation, results, and emotional impact."
          },
          {
            role: "user",
            content: `Enhance this testimonial from ${clientInfo.name}, ${clientInfo.title} at ${clientInfo.company}: "${originalText}"`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error enhancing testimonial:', error);
    throw error;
  }
};

export { enhanceTestimonial }; 