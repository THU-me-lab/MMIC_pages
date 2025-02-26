# 02 StandardForm&Laplace

## 状态空间

使用状态空间表示是先进控制理论的第一关。

状态是指在系统中可决定系统状态、最小数目变量的有序集合。而所谓状态空间则是指该系统全部可能状态的集合。简单来说，状态空间可以视为一个以状态变数为坐标轴的空间，因此系统的状态可以表示为此空间中的一个向量。

状态空间表示法即为一种将物理系统表示为一组输入、输出及状态的数学模式，而输入、输出及状态之间的关系可用许多一阶微分方程来描述。

一般来说最普遍的状态空间表达式为：

$$
\begin{aligned}
\dot{X} &= \mathcal{A}(X,U) \\
Y &= \mathcal{B}(X,U)
\end{aligned}
$$

第一个式子表示状态方程，第二个式子表示输出方程。当系统为线性时不变系统时，状态方程和输出方程可以表示为：

$$
\begin{aligned}
\dot{X} &= AX + BU \\
Y &= CX + DU
\end{aligned}
$$

当然也可以形式地组合为一个大矩阵方程

$$
\begin{bmatrix}
  \dot{X} \\
  Y \\
\end{bmatrix} = \begin{bmatrix}
  A & B \\
  C & D \\
\end{bmatrix}\begin{bmatrix}
  X \\
  U \\
\end{bmatrix}
$$

## 传递函数

从输入到输出之间的关系可以在频域抽象为一个传递函数。

$$
G(s) = \frac{Y(s)}{U(s)}
$$

传递函数的极点和零点决定了系统的稳定性和动态响应。一般来说，传递函数极点在y轴左侧时系统是稳定的，而极点在y轴右侧时系统是不稳定的，当极点在y轴上时系统是临界稳定的。

![图 0](images/%E4%BC%A0%E9%80%92%E5%87%BD%E6%95%B0%E7%9A%84%E9%9B%B6%E7%82%B9%E4%B8%8E%E6%9E%81%E7%82%B9.png)  

## 拉普拉斯变换

**拉普拉斯变换(Laplace Transform)** 以及 **傅里叶变换(Fourier)** 作为两种积分变换方法，对于线性齐次微分方程可以给出快捷的求解。其本质在于这两种积分变换的逆变换任然是以积分的形式，这将使得可以将源微分方程通过正积分变换到频域，求解在频域中的多项式方程，最后通过逆积分变换得到源微分方程的解。

![图 0](images/%E7%A7%AF%E5%88%86%E5%8F%98%E6%8D%A2%E6%A1%86%E6%9E%B6.png)  

### Laplace Transform

$$
F(s) \equiv \mathcal{L}\{f(t)\}=\int_{0}^{\infty} f(t) e^{-st} dt
$$

$$
f(t) \equiv \mathcal{L}^{-1}\{F(s)\}=\frac{1}{2\pi j}\int_{\sigma-j\infty}^{\sigma+j\infty} F(s) e^{st} ds
$$

### 一些具体的变换

- 狄拉克函数

$$
x(t)=\delta(t) \quad \Rightarrow \quad X(s)=1
$$

- 幂函数

$$
x(t)=t^n \cdot 1(t) \quad \Rightarrow \quad X(s)=\frac{n!}{s^{n+1}}
$$

- 指数函数

$$
x(t)=\mathrm{e}^{-a t} \quad \Rightarrow \quad X(s)=\frac{1}{s+a}
$$

- 三角函数

三角函数实际上可以直接取自 a 纯虚数的指数函数的实部与虚部

$$
\overline{x}(t) =  \cos \omega t + \mathrm{i} \sin \omega t = \mathrm{e}^{\omega \mathrm{i} t} \quad \Rightarrow \quad \overline{X}(s)=\frac{1}{s-\omega \mathrm{i}}
$$

对上述变换分别取实部和虚部有

$$
x(t)=\cos \omega t \quad \Rightarrow \quad X(s)=\Re\{ \frac{1}{s+\omega \mathrm{i}} \} = \frac{s}{s^2+\omega^2}
$$

$$
x(t)=\sin \omega t \quad \Rightarrow \quad X(s)=\Im\{ \frac{1}{s+\omega \mathrm{i}} \} = \frac{\omega}{s^2+\omega^2}
$$

- 抽象函数

:  - Linearity $\mathcal{L}[a x(t)+b y(t)]=a X(s)+b Y(s)$
:  - Differentiation $\mathcal{L}\left[\frac{d}{d t} x(t)\right]=s \cdot X(s)-x(0)$
:  - Integration $\mathcal{L}\left[C+\int_0^t x(t) d t\right]=\frac{1}{s} \cdot X(s)+\frac{1}{s} \cdot C$
:  - Delay $\mathcal{L}[x(t-a)]=e^{-a s} \cdot X(s)$
:  - Decay $\mathcal{L}\left[e^{-a t} x(t)\right]=X(s+a)$
:  - Convolution Theorem $\mathcal{L}[x(t) * y(t)]=X(s) \cdot Y(s)$
:  - Initial Value Theorem $x\left(0^{+}\right)=\lim _{t \rightarrow 0} x(t)=\lim _{s \rightarrow \infty} s X(s)$
:  - Final Value Theorem $x(\infty)=\lim _{t \rightarrow \infty} x(t)=\lim _{s \rightarrow 0} s X(s)$

- Laplace Transform Table

| $\qquad\qquad\qquad \mathbf{x}(\mathbf{t}) \qquad\qquad\qquad$    | $\qquad\qquad\qquad \mathbf{X}(\mathbf{s}) \qquad\qquad\qquad$ |
| :---: | :---: |
| $\delta(t)$                                                       | 1 |
| $1(t)$                                                            | $\dfrac{1}{s}$ |
| $t \cdot 1(t)$                                                    | $\dfrac{1}{s^2}$ |
| $x(t)=t^n \cdot 1(t)$                                             | $L[x(t)]=\dfrac{n!}{s^{n+1}}$ |
| $e^{-a t}$                                                        | $\dfrac{1}{s+a}$ |
| $\sin \omega t$                                                   | $\dfrac{\omega}{s^2+\omega^2}$ |
| $\cos \omega t$                                                   | $\dfrac{s}{s^2+\omega^2}$ |
| $e^{-a t} \sin \omega t$                                          | $\dfrac{\omega}{(s+a)^2+\omega^2}$ |
| $e^{-a t} \cos \omega t$                                          | $\dfrac{s+a}{(s+a)^2+\omega^2}$ |
| $\cdots$                                                          | $\cdots$ |

### 一些相关的技巧

在拉普拉斯逆变换的过程中，常常会出现有理分式分解的问题。我们常常使用留数公式(Residual Formula)来分解有理分式（当然待定系数法也可以）。如对于一个有理传递函数，其分母可以被分解为：

$$
Y(s)=\frac{C(s)}{\left(s-p_1\right)^{n_1} \cdots\left(s-p_l\right)^{n_l}}
$$

则其可以展开为

$$
Y(s)=\underbrace{\frac{A_{11}}{s-p_1}+\frac{A_{12}}{\left(s-p_1\right)^2}+\cdots+\frac{A_{1 n_1}}{\left(s-p_1\right)^{n_1}}}_{n_1 \text { terms for } p_1}+\cdots+\underbrace{\frac{A_{l 1}}{s-p_l}+\frac{A_{l 2}}{\left(s-p_l\right)^2}+\cdots+\frac{A_{l n_l}}{\left(s-p_l\right)^{n_l}}}_{n_l \text { terms for } p_l}
$$

其中系数 $A_{ji}$ 满足

$$
A_{j i}=\left.\frac{1}{(n_j-i)!} \frac{d^{n_j-i}}{d s^{n_j-i}}\left[\left(s-p_j\right)^{n_j} Y(s)\right]\right|_{s=p_j}
$$
