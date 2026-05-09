import PyPDF2
import io


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extract all text from a PDF file given as bytes.
    Returns extracted text string, trimmed to 4000 chars.
    Raises ValueError if no text could be extracted.
    """
    reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    text = text.strip()
    if not text:
        raise ValueError("Could not extract text from PDF. "
                         "The file may be scanned or image-based.")

    return text[:4000]
