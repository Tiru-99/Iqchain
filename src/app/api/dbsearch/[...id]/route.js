import { BSON } from 'bson'; // Import BSON for ObjectId handling

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db("iqchain");

    // Check if the ID is a valid ObjectId
    if (!BSON.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid quiz ID format' }, { status: 400 });
    }

    // Fetch the quiz using ObjectId from BSON
    const quiz = await db.collection('quizzes').findOne({ _id: new BSON.ObjectId(id) });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error while fetching quiz:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz. ' + error.message }, { status: 500 });
  }
}
