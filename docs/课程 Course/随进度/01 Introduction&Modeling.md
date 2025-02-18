# 01 Introduction&Modeling

## 名词与概念

- System 系统：由一组相互关联的部件组成的整体，这些部件之间通过某种方式相互作用，以实现某种特定的功能。
- Modeling 建模：获得描述系统行为的数学模型。
- Analysis 系统分析：研究特定条件下已知模型的系统性能。

- 反馈控制系统：经典的反馈控制环路如下图

![feedback](images/feedback%20control.png)

- Input 输入：A variable that excites a system. Inputs are not always known beforehand, Inputs are always responsible for problems in systems
- Output 输出：A variable that we observe and consider important
- State 状态：A variable that is used to describes the internal system dynamics. A set of states can be used to fully describe system' s current situation.

- 控制系统

控制系统的分类：

> 按是否反馈分类

   1. Open-loop control system (开环控制系统)
   2. Closed-loop control system (闭环控制系统)
   3. Semi-closed-loop control system (半闭环控制系统)

> 按输入分类

   1. Constant value control system (恒定值控制系统)
   2. Servo control system (伺服控制系统)

> 按系统信号分类

   1. Continuous control system (连续控制系统)
   2. Discrete control system (离散控制系统)

> 按输入输出类型分类

   1. SISO (Single Input Single Output) control system (单输入单输出控制系统)
   2. MIMO (Multiple Input Multiple Output) control system (多输入多输出控制系统)

> 按是否时变分类

   1. Time-invariant control system (时不变控制系统)
   2. Time-variant control system (时变控制系统)

> 按是否线性分类

   1. Linear control system (线性控制系统)
   2. Nonlinear control system (非线性控制系统)

- LTI Linear Time-Invariant Systems 线性时不变系统

## 系统建模 - 机械

系统建模的目标一般来说是得到可以描述系统的方程，在本课程中一般会遇到的是一个线性的微分方程。机械系统的建模结果一般是运动方程（EOM, Equation of Motion）。位置量的零阶、一阶、二阶导系数一般称为弹性系数、阻尼系数、惯性系数。

### 平动机械系统

#### 最简 质量-弹簧-阻尼（M-K-B）系统

一般来说，平动机械系统总会被我们等效为一个包含 **质量M、弹簧K、阻尼B** 的系统。这个系统的等效模型如下：

![图 0](images/%E5%B9%B3%E5%8A%A8%E6%9C%BA%E6%A2%B0%E7%B3%BB%E7%BB%9F.png)  

可以得到的动力学方程如下

- 胡可定理

$$
F_{K} = K x
$$

- 阻尼定理

$$
F_{B} = B \dot{x}
$$

- 牛顿第二定律

$$

F_{M} = M \ddot{x}
$$

- 受力关系

$$
F_{M} = f - F_{K} - F_{B}
$$

故该系统的动力学方程为

$$
\underset{\begin{array}{c}
\text { Contributi on } \\
\text { of Inertia }
\end{array}}{M \ddot{x}}+\underset{\begin{array}{c}
\text { Contributi on } \\
\text { of the Damper }
\end{array}}{B \dot{x}}+\underset{\begin{array}{c}
\text { Contributi on } \\
\text { of the Spring }
\end{array}}{K x}=\underset{\begin{array}{c}
\text { Total } \\
\text { Applied Force }
\end{array}}{f(t)}
$$

这是最基础也最为普遍的方程形式，后续在讨论其他形式线性系统时，都会尝试将其解释为 **质量-弹簧-阻尼** 的系统形式，从而实现对新系统更加快速的理解和建模。

#### 串联和并联

在将复杂机械系统等效为最简的 **M-K-B** 系统时，常常会出现串联和并联的情况

- 串联

![图 8](images/%E4%B8%B2%E8%81%94.png)  

$$
K_{EQ} = \frac{K_1K_2}{K_1+K_2}\qquad\qquad\qquad B_{EQ} = \frac{B_1B_2}{B_1+B_2}
$$

- 并联

![图 7](images/%E5%B9%B6%E8%81%94.png)  

$$
K_{EQ} = K_1 + K_2\qquad\qquad\qquad B_{EQ} = B_1 + B_2
$$

串联和并联的等效本质上都是在描述力和位移之间的分配关系，其中有意思的部分还有很多，如更多维度空间下的串并联、星-三角变换形式的等效等等，同学们可以自行探索。

#### 多自由度下的平动系统

![图 9](images/2%E8%87%AA%E7%94%B1%E5%BA%A6%E7%9A%84%E5%B9%B3%E5%8A%A8%E7%B3%BB%E7%BB%9F.png)  

在n自由度的机械系统外延中，我们可以将 **M-K-B** 系统进行推广，此时 $M$、$K$、$B$ 都被拓展到了 n*n 的二维张量形式，以描述从位移到力的映射关系。

$$
\left[\begin{array}{cc}
M_1 & 0 \\
0 & M_2
\end{array}\right]\left[\begin{array}{l}
\ddot{x}_1 \\
\ddot{x}_2
\end{array}\right]+\left[\begin{array}{cc}
B_1+B_2 & -B_2 \\
-B_2 & B_2
\end{array}\right]\left[\begin{array}{l}
\dot{x}_1 \\
\dot{x}_2
\end{array}\right]+\left[\begin{array}{cc}
K_1+K_2 & -K_2 \\
-K_2 & K_2
\end{array}\right]\left[\begin{array}{l}
x_1 \\
x_2
\end{array}\right]=\left[\begin{array}{l}
f_1(t) \\
f_2(t)
\end{array}\right]
$$

当然对于 n 自由度来说，你总可以找到 n 个各自独立的广义变量来描述整个系统， 这里我们可以令广义变量 $q_1 = x_1, q_2 = x_2 - x_1$, 从而我们的系统方程可以被写为

$$
\left[\begin{array}{cc}
M_1 & 0 \\
M_2 & M_2
\end{array}\right]\left[\begin{array}{l}
\ddot{q}_1 \\
\ddot{q}_2
\end{array}\right]+\left[\begin{array}{cc}
B_1 & -B_2 \\
0 & B_2
\end{array}\right]\left[\begin{array}{l}
\dot{q}_1 \\
\dot{q}_2
\end{array}\right]+\left[\begin{array}{cc}
K_1 & -K_2 \\
0 & K_2
\end{array}\right]\left[\begin{array}{l}
q_1 \\
q_2
\end{array}\right]=\left[\begin{array}{l}
f_1(t) \\
f_2(t)
\end{array}\right]
$$

### 转动机械系统

在完成平动机械系统之后，我们的研究思路将转换为面对一个新的系统，是否可以被描述为 $M-K-B$ 参数的形式，从而得到方程来描述这个系统的动力学行为。转动机械系统就是一个很好的例子。是否可以等效是用方程来说话的

|系统参数|平动机械系统|转动机械系统|
|---|---|---|
|M|质量$F_M=M\ddot{x}$|转动惯量$T_I=I\ddot{\theta}$|
|K|弹簧$F_K=Kx$|扭簧$T_K=K\theta$|
|B|阻尼$F_B=B\dot{x}$|摩擦$T_B=B\dot{\theta}$|

由此，我们建立了一组等效的系统关系: $(F,x) \rightarrow (T,\theta)$, 他们分别在 $(M,K,B),(I,K,M)$ 下具有相同的方程形式。一个通常意义上的转动机械系统的方程可以写成如下形式

$$
\underset{\begin{array}{c}
\text { Contribution } \\
\text { of Inertia }
\end{array}}{J \ddot{\theta}}+\underset{\begin{array}{c}
\text { Contribution } \\
\text { of the Damper }
\end{array}}{B \dot{\theta}}+\underset{\begin{array}{c}
\text { Contribution } \\
\text { of the Spring }
\end{array}}{K \theta}=\underset{\begin{array}{c}
\text { Total } \\
\text { Applied Torque }
\end{array}}{\boldsymbol{J}(t)}
$$

如费曼所言，相同的方程反应的相同的本质。聪明的同学当然可以一眼看出这两个系统只是使用了不同广义变量与其对应广义力的二阶力学系统。正是这样！

## 拓展：能量表述 拉格朗日力学 哈密顿方程

机械系统多种多样，可以选择的广义变量与广义力也多种多样。我们无法穷尽所有的系统，但是我们可以尝试找到一种更加普适的描述方法，那就是能量表述。无论运动形式如何，能量的量纲和形式总是一致且保持不变的。
