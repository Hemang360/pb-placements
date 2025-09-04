import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { memberId, memberName } = await req.json();

    if (!memberId || !memberName) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    const proxyUrl = `/api/resume/view/${memberId}`;

    return NextResponse.json({
      success: true,
      resumeUrl: proxyUrl,
      filename: `${memberName.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`,
    });

  } catch (error) {
    console.error('[RESUME_DOWNLOAD]', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
    }, { status: 500 });
  }
}
