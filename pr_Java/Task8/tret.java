package Task8;
import java.awt.Graphics;
import java.awt.Image;
import java.util.Timer;
import java.util.TimerTask;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
public class tret extends  JPanel{
        private static final int HEIGHT = 1080;
        private static final int WIDTH = 1920;
        private JFrame frame;
        private Timer timer;
        private Image image;
        public tret() {
            frame = new JFrame("Application name");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(WIDTH, HEIGHT);
            frame.add(this);
            frame.setVisible(true);
            image =  new ImageIcon("D:\\Обои\\1234.jpeg").getImage();
            count = 0;
            timer = new Timer();
            timer.schedule(animate, 1,200);
        }
        private int count;
        TimerTask animate = new TimerTask() {

            @Override
            public void run() {
                switch (count) {
                    case 20:
                        image = new ImageIcon("D:\\Обои\\1680.jpg").getImage();
                        break;
                    case 40:
                        image = new ImageIcon("D:\\Обои\\03.jpg").getImage();
                        break;
                    case 60:
                        image = new ImageIcon("D:\\Обои\\1234.jpeg").getImage();
                        break;
                    default:
                        break;
                }
                count++;
                if (count == 80) {
                    count = 0;
                }
                repaint();
            }
        };
        public void paint(Graphics canvas) {
            canvas.drawImage(image, 0, 0,  null);
        }
        public static void main(String[] args){
            new tret();
        }

    }
