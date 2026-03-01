package Task22.three;
import javax.swing.*;
import java.io.FileNotFoundException;
import java.io.IOException;
public class CarcasController {
        private final CarcasModel model;
        private final CarcasView view;
        public CarcasController() {
            this.model = new CarcasModel();
            this.view = new CarcasView<>();

            view.addNewListener(e -> {
                model.setDocument(new CreateTextDoc().CreateNew());
                view.showDocText((TextDocument) model.getDocument());
            });

            view.addOpenListener(e -> {
                try {
                    model.setDocument(new CreateTextDoc().CreateOpen(((CarcasView.openDocA) e).getPath()));
                    view.showDocText((TextDocument) model.getDocument());
                } catch (FileNotFoundException exc) {
                    JOptionPane.showMessageDialog(view, "File does not exist");
                }
            });

            view.addSaveListener(e -> {
                var document = ((CarcasView.saveDocA)e).getDocument();
                System.out.println("Saved");
                try {
                    document.save();
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            });
        }

        void showWindow() {
            this.view.setVisible(true);
        }
    }


