
package Task7;
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
public class Windows extends JFrame{
    int milan;
    int madrid;
    JButton but1 = new JButton("AC Milan");
    JButton but2 = new JButton("Real Madrid");
    JLabel lbl1 = new JLabel("Result: 0 X 0");
    JLabel lbl2 = new JLabel("Last Scorer: N/A");
    JLabel lbl3 = new JLabel("Winner: DRAW");
    public Windows(){
        super("Result");
        setLayout((LayoutManager) null);
        but1.setBounds(12, 12, 100, 100);
        but2.setBounds(300,12,100,100);
        lbl1.setBounds(112, 12,100,100);
        lbl2.setBounds(112,30,100,100);
        lbl3.setBounds(112,50,100,100);
        add(but1);
        add(but2);
        add(lbl1);
        add(lbl2);
        add(lbl3);
        but1.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                try {
                    ++Windows.this.milan;
                    Windows.this.lbl1.setText("Result: "+Windows.this.milan+" X "+Windows.this.madrid);
                    Windows.this.lbl2.setText("Last Scorer: AC Milan");
                    if(Windows.this.milan > Windows.this.madrid){
                        Windows.this.lbl3.setText("Winner: AC Milan");
                    }
                    if (Windows.this.milan == Windows.this.madrid){
                        Windows.this.lbl3.setText("Winner: DRAW");
                    }
                }
                catch (Exception e){
                }
            }
        });
        but2.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ae) {
                try {
                ++Windows.this.madrid;
                Windows.this.lbl1.setText("Result: "+Windows.this.milan+" X "+Windows.this.madrid);
                Windows.this.lbl2.setText("Last Scorer: Real Madrid");
                if(Windows.this.milan < Windows.this.madrid){
                    Windows.this.lbl3.setText("Winner: Real Madrid");
                }
                if (Windows.this.milan == Windows.this.madrid){
                    Windows.this.lbl3.setText("Winner: DRAW");
                }
            }
                catch (Exception e){}
            }
        });
        setSize(200,200);
    }
    public static void main(String[] args){
        Windows w = new Windows();
        w.setVisible(true);
        w.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}