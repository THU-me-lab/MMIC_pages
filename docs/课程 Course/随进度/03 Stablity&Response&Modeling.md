# 03 Stablity&Response&Modeling

## 稳定性 Stability

系统稳定性是我们对一个系统关心的指标之一，一个稳定的系统能够保证系统的可用性，可靠性，安全性。

![图 1](images/%E7%B3%BB%E7%BB%9F%E7%A8%B3%E5%AE%9A%E6%80%A7.png)  

一般来说，我们通过传递函数的极点来判断系统的稳定性。当传递函数的极点在左半平面时，系统是稳定的。当传递函数的极点在右半平面时，系统是不稳定的。当传递函数的极点在虚轴上时，系统是临界稳定的。但是对于高阶系统，求出极点并不是一件容易的事情，我们可以使用一些方法来判断系统稳定性

### Rous 判据

劳斯判据实际上是一种辗转相除法。一般来说我们使用一个 Rous Table 来记录辗转相除的过程并最终统计出系统的稳定性。

$$
\begin{array}{|l|l|l|l|}
\hline a_n & a_{n-2} & a_{n-4} & \ldots \\
\hline a_{n-1} & a_{n-3} & a_{n-5} & \ldots \\
\hline b_1 & b_2 & b_3 & \ldots \\
\hline c_1 & c_2 & c_3 & \ldots \\
\hline \vdots & \vdots & \vdots & \ddots \\
\hline
\end{array}
$$

其中

$$
\begin{aligned}
b_i & =\frac{a_{n-1} \times a_{n-2 i}-a_n \times a_{n-2 i-1}}{a_{n-1}} \\
c_i & =\frac{b_1 \times a_{n-2 i-1}-a_{n-1} \times b_{i+1}}{b_1}
\end{aligned}
$$

第一列中的符号变化次数将是非负极点的数目。

当出现第一项为 0 时，通常表示包含在 y 轴上的极点。

## 典型的一阶和二阶系统

### 一阶系统

一阶系统具有传递函数：

$$G(s) = \frac{K}{\tau s+1}$$

对于一个阶跃输入 $u(t) = 1(t)，(t>0)$，系统的输出为：

$$
y(t) = \mathcal{L}^{-1}\left(\frac{K}{\tau s+1}\frac{1}{s}\right) = K - K\mathrm{e}^{-\frac{t}{\tau}}
$$

绘图如下：

=== "Mathmatica"
    ```mathematica
    Plot[{K - K Exp[-t/τ], /. {K -> 1, τ -> 1},K}, {t, 0, 5}]
    ```
    ![图 0](images/%E4%B8%80%E9%98%B6%E7%B3%BB%E7%BB%9F%E7%BB%98%E5%9B%BE.png)  

=== "Python"
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    K = 1
    τ = 1
    t = np.linspace(0, 5, 100)
    y = K - K * np.exp(-t / τ)
    plt.plot(t, y)
    plt.plot(t, K * np.ones_like(t), 'r--')
    plt.show()
    ```
    ![图 1](images/%E4%B8%80%E9%98%B6%E7%B3%BB%E7%BB%9F%20py.png)  

=== "Matlab"
    ```matlab
    K = 1;
    tau = 1;
    t = 0:0.01:5;
    y = K - K * exp(-t / tau);
    plot(t, y)
    ```

一阶系统通常使用阶跃响应的时间常数 $\tau$ 来描述系统的动态响应速度。时间常数越小，系统的动态响应越快。

一般来说，一阶系统可以在 $t = 4\tau$ 时达到距离目标 2% 以内，在 $t = 5\tau$ 时达到距离目标 0.7% 以内。

![图 2](images/%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%80%E9%98%B6%E7%B3%BB%E7%BB%9F%E7%9B%B8%E5%BA%94.png)  

### 二阶系统

二阶系统具有传递函数：

$$
G(s) = \frac{K}{\frac{1}{\omega_n^{2}} s^2 + \frac{2\zeta}{\omega_n} s + 1}
$$

其极点为：

$$
p_{1,2} = -\zeta \omega_n \pm \omega_n\sqrt{\zeta^2 - 1}
$$

特别的，当 $\zeta<1$ 时，将会有两个共轭的复数极点，此时 $p_{1,2}=-\zeta \omega_n \pm \mathrm{j}\omega_n\sqrt{1-\zeta ^{2}}$ , 令 $\sigma = \zeta \omega_n$, $\omega_d = \omega_n\sqrt{1-\zeta ^{2}}$

对于一个阶跃输入 $u(t) = 1(t)，(t>0)$，系统的输出为：

$$
y(t) = \mathcal{L}^{-1}\left(\frac{K}{\frac{1}{\omega_n^{2}} s^2 + \frac{2\zeta}{\omega_n} s + 1}\frac{1}{s}\right) = K - \frac{K}{\sqrt{1-\zeta ^{2}}}\mathrm{e}^{-\sigma t}\sin \left(\omega_d t+\arctan \frac{\sqrt{1-\zeta ^{2}}}{\zeta}\right)
$$

我们感兴趣的量有以下几个：

1. 峰值时间 $t_p$：系统输出第一次到达峰值的时间。 $t_p=\frac{\pi}{\omega_d}=\frac{\pi}{\omega_n\sqrt{1-\zeta ^{2}}}$
2. 超调量 $\%OS = K\mathrm{e}^{-\frac{\pi \zeta}{\sqrt{1-z^{2}}}}$
3. settling time $t_s$ 大概也是取 $t_s = 4\tau$

绘图如下：

=== "Mathmatica"
    ```mathematica
    Plot[{K - K/Sqrt[1 - ζ^2] Exp[-σ t] Sin[ωd t + ArcTan[Sqrt[1 - ζ^2]/ζ]], /. {K -> 1, ζ -> 0.5, ωn -> 1},K}, {t, 0, 5}]
    ```

=== "Python"
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    K = 1
    ζ = 0.5
    ωn = 1
    σ = ζ * ωn
    ωd = ωn * np.sqrt(1 - ζ ** 2)
    t = np.linspace(0, 5, 100)
    y = K - K / np.sqrt(1 - ζ ** 2) * np.exp(-σ * t) * np.sin(ωd * t + np.arctan(np.sqrt(1 - ζ ** 2) / ζ))
    plt.plot(t, y)
    plt.plot(t, K * np.ones_like(t), 'r--')
    plt.show()
    ```

=== "Matlab"
    ```matlab
    K = 1;
    zeta = 0.5;
    wn = 1;
    sigma = zeta * wn;
    wd = wn * sqrt(1 - zeta ^ 2);
    t = 0:0.01:5;
    y = K - K / sqrt(1 - zeta ^ 2) * exp(-sigma * t) .* sin(wd * t + atan(sqrt(1 - zeta ^ 2) / zeta));
    plot(t, y)
    ```
