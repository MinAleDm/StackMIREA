package Task15;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.border.CompoundBorder;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class MovieView extends JFrame {
    private JLabel name_movie;
    private JLabel prince;
    private JLabel time;

    MovieView() throws IOException, InterruptedException {
        super("Расписание кино");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        name_movie = new JLabel();
        prince = new JLabel();
        time = new JLabel();

        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(new Color(255,255,255));
        panel.add(Box.createVerticalGlue());

        JPanel imagePanel = new JPanel();
        imagePanel.setPreferredSize(new Dimension(800, 600));
        imagePanel.setMaximumSize(new Dimension(800, 600));
        imagePanel.setBackground(new Color(255,255,255));
        imagePanel.add(name_movie);

        panel.add(imagePanel);
        imagePanel.setAlignmentX(Component.CENTER_ALIGNMENT);

        panel.add(prince);
        panel.add(Box.createRigidArea(new Dimension(0, 20)));

        prince.setAlignmentX(Component.CENTER_ALIGNMENT);
        time.setAlignmentX(Component.CENTER_ALIGNMENT);

        panel.add(time);
        time.setMaximumSize(new Dimension(1000, 250));

        panel.add(Box.createVerticalGlue());

        getContentPane().add(panel);
        setSize(800, 800);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
    }

    public void setImage(String filename) {

        try {
            BufferedImage img = ImageIO.read(new File(filename));
            JLabel picture = new JLabel();
            picture.setIcon(new ImageIcon(img));
        } catch (IOException e) {
            System.out.println("Ошибка при получении картинки");
        }
    }
    public void updateView(String imagePath, String date, String description){
        name_movie.setIcon(new ImageIcon(imagePath));
        prince.setText(date);
        time.setText("<html><body style='width: 100%;'>"+ description +"</body></html>");
    }
}
