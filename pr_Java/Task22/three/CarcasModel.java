package Task22.three;

public class CarcasModel {
    private IDocument<?> document;

    public CarcasModel() {
    }

    public CarcasModel(IDocument<?> document) {
        this.document = document;
    }

    public IDocument<?> getDocument() {
        return document;
    }

    public void setDocument(IDocument<?> document) {
        this.document = document;
    }

}
